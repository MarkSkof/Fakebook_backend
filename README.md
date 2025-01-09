# SETUP

--------------
1. Clone the project and go into project directory.
```shell
    git clone https://github.com/MarkSkof/fakebook_backend.git
    cd fakebook_backend
```

2. In file `docker/docker-compose.yaml` make sure that environmental variable `MINIO_HOST` of service `api` is set to a ip address on which frontend will access it. For example if everything will only run in local network you set this variable to `IP of a host PC`, if api will be accessabel no the internet make sure to set this variable to your `public IP`, in case you will run everything on a single PC ypu can just use `localhost`.


3. Make sure you are in `project root directory` and run the following commands:
   
```sh
    docker build -t fakebook_backend_base -f docker/base.Dockerfile .
    docker build -t fakebook_api -f docker/api.Dockerfile .
    docker compose -f docker/docker-compose.yaml up
```

4. In your browser connect to `minio we UI` that is accessable on `localhost:9001`. Once connected login with default credentials username: `admin` password: `adminadmin`. Then create a bucket by Clicking `Create bucket`, make sure to name it `fakebook` (if you want a different name for your bucket, then you need to set environmental variable `MINIO_BUCKET` in `docker-compose.yaml` under a service `api` to the same name)



5. Once you've created a bucket upload `public/images/default.jpg` image to the newly created bucket.


6. In minio web UI go under `Àccess key` tab and create new access key. In `docker-compose.yaml` file the Secret key and Access key are both set to `12345678`. Now eater make Access and Secret key the same or change environmental variables `MINIO_SECRET_KEY` and `MINIO_ACCESS_KEY` in service `api` to appropriate values.

