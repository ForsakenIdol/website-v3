from github import Github as GitHub_Initializer
import os

# Requires the user's personal access token in an environment variable named "GITHUB_PAN"
g = GitHub_Initializer(os.environ["GITHUB_PAN"])

# Test to see if this works
# Should print repo names
for repo in g.get_user().get_repos():
    print(repo.name)