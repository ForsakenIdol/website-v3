## The Cronjob

The cronjob is a Python script that interfaces with GitHub using an SDK. Its main purpose is to pull repository data from an account (credentials passed as environment variables through secrets from the `5_credentials.yaml` file) and send that data to the middleware server.

Why Python? For practise mainly.