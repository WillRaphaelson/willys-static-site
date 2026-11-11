FROM caddy:2.11.9-alpine
WORKDIR /srv
COPY Caddyfile /etc/caddy/Caddyfile
COPY public /srv/public
ENV PORT=8080 SITE_ROOT=/srv/public
EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
