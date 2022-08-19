"""
#########################
# ENVIRONMENT VARIABLES
#########################

- GITHUB_PAN: The personal access token for the GitHub user who's repository information we need to extract.
- DB_SERVER: The hostname of the middleware fronting the database server.

"""

from github import Github as GitHub_Initializer
import os
import requests # For communicating with the database API wrapper.
from datetime import datetime, timezone, timedelta

def getDate(offset):
    return datetime.now(timezone(timedelta(hours=offset)))

offset = 8; # Fixed for AWST for now.

def logMessage(message):
    print("[{}] {}".format(getDate(offset), message))

def fetch(path, method="GET", body=None):
    if body == None and method == "GET":
        r = requests.get(os.environ["DB_SERVER"] + path)
    else:
        r = requests.post(os.environ["DB_SERVER"] + path, json=body)
    return r

logMessage("Initialising GitHub cronjob...")

# Requires the user's personal access token in an environment variable named "GITHUB_PAN"
g = GitHub_Initializer(os.environ["GITHUB_PAN"])

# Check connectivity
logMessage("Checking connectivity...")

try:
    r = fetch("/ping")
    if r.status_code == 200:
        logMessage("Database server returned status code {}. {}".format(r.status_code, r.text))
    else:
        logMessage("Unknown error connecting to database server.")
        exit(1)
except Exception as e:
    logMessage("Encountered error below.")
    print(e)
    logMessage("Could not verify database server connectivity.")
    exit(1)

"""
---------- MAIN BODY OF CRONJOB ----------

Pull all the repository information using the unique GITHUB_PAN environment variable.
This needs to be passed in the Kubernetes cronjob spec.
Imports repository information to the PostgreSQL database in the same cluster.
"""

for repo in g.get_user().get_repos():
    # Of note: `repo.homepage` does not link to the repository page, unless it is the special README page.
    body = {
        "repo_id": repo.id,
        "repo_name": repo.name,
        "created_at": str(repo.created_at),
        "description": repo.description,
        "url": repo.url,
        "private": repo.private
    }
    logMessage(body)

    # DELETE...
    try:
        r = fetch("/delete/id/{}".format(repo.id), method="POST")
        logMessage("Delete returned status code {}".format(r.status_code))
        logMessage(r.json())
    except Exception as e:
        logMessage("Error while deleting entry.")
        print(e)
        exit(1)

    # ... then CREATE.
    try:
        r = fetch("/create", body=body)
        logMessage("Create returned status code {}".format(r.status_code))
        logMessage(r.json())
    except Exception as e:
        logMessage("Error while creating entry.")
        print(e)
        exit(1)

logMessage("Script completely successfully.")