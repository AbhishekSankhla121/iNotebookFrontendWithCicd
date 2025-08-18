
upstream frontend_cluster{
server localhost:3000;
server localhost:3001;
server localhost:3002;
}
upstream backend_cluster{
server localhost:5000;
server localhost:5001;
server localhost:5002;
}

server {
server_name inotebookfrontend.fazalbazar.shop inotebookbackend.fazalbazar.shop;
location / {
        if ($host = inotebookfrontend.fazalbazar.shop){
        proxy_pass http://frontend_cluster;
        }
        if ($host = inotebookbackend.fazalbazar.shop){
        proxy_pass http://backend_cluster;
        }
}

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/inotebookbackend.fazalbazar.shop/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/inotebookbackend.fazalbazar.shop/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
