FROM nginx:latest

COPY conf/nginx/nginx.conf   /etc/nginx/conf.d/default.conf
COPY conf/nginx/fastcgi.conf /etc/nginx/fastcgi.conf
COPY api/public              /api
COPY conf/nginx/bootstrap    /etc/bootstrap

CMD /etc/bootstrap
