FROM php:8-fpm


RUN apt-get update && apt-get install -y \
  libfreetype6-dev \
  libjpeg62-turbo-dev \
  libpng-dev \
  && docker-php-ext-configure gd \
  && docker-php-ext-install -j$(nproc) gd

WORKDIR /srv

RUN chown -R 1000:1000 /srv

USER 1000