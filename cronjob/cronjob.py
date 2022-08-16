"""
#########################
# ENVIRONMENT VARIABLES
#########################

- GITHUB_PAN: The personal access token for the GitHub user who's repository information we need to extract.
- DB_SERVER: The hostname of the middleware fronting the database server.

##########
# TODO
##########

- Log using the "logMessage(message)" function from now on.
- Before running the main body of the cronjob, hit the "/ping" path to check if the database server returns a 200 status.

"""

from json import JSONDecodeError
from github import Github as GitHub_Initializer
import os
import requests # For communicating with the database API wrapper.
from datetime import datetime, timezone, timedelta

def getDate(offset):
    return datetime.now(timezone(timedelta(hours=offset)))

offset = 8; # Fixed for AWST for now.

def logMessage(message):
    print("[{}] {}".format(getDate(offset), message))

# Requires the user's personal access token in an environment variable named "GITHUB_PAN"
g = GitHub_Initializer(os.environ["GITHUB_PAN"])

"""
---------- MAIN BODY OF CRONJOB ----------

Pull all the repository information using the unique GITHUB_PAN environment variable.
This needs to be passed in the Kubernetes cronjob spec.
Imports repository information to the PostgreSQL database in the same cluster.
"""

for repo in g.get_user().get_repos():
    # Of note: `repo.homepage` does not link to the repository page, unless it is the special README page.
    print([repo.id, repo.name, repo.created_at, repo.description, repo.url, repo.private])

# Practising the 'requests' library

try:
    r = requests.get(os.environ["DB_SERVER"] + "/get/id/463741050")
except ConnectionError:
    print("Connection error while trying to reach database server.")
    exit(1)

print(r.url)
try:
    print(r.json())
except JSONDecodeError:
    print(r.text)
    print("Response is not a JSON object! Could not JSONify response.")