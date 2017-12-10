docker stop bbq-api && docker stop bbq-kitchen
docker rm bbq-api && docker rm bbq-kitchen

docker build api/ -t bbq-api
docker build kitchen/ -t bbq-kitchen

docker network create bbq-network
docker run -d --net bbq-network --name bbq-kitchen bbq-kitchen:latest 
docker run -d --net bbq-network --name bbq-api -p 8080:8080 --link bbq-kitchen:kitchen bbq-api:latest
