FROM python:3.8

WORKDIR /usr/src/app

COPY cronjob.py requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "cronjob.py" ]

# Build locally with "docker build -t lachldwaws/python_cronjob ."
# Run with "docker run --env GITHUB_PAN --env "DB_SERVER=host.docker.internal" lachldwaws/python_cronjob"