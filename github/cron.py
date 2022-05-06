from github import Github as GitHub_Initializer
import os
import requests # For communicating with the database API wrapper.

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