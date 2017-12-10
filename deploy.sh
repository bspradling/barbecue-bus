docker stop bbq-api && docker stop bbq-kitchen
docker rm bbq-api && docker rm bbq-kitchen

docker build api/ -t bbq-api
docker build kitchen/ -t bbq-kitchen

docker run -d --name bbq-kitchen bbq-kitchen:latest 
docker run -d --name bbq-api -p 8080:8080 --link bbq-kitchen:bbq-kitchen bbq-api:latest
