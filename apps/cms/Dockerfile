FROM php:8.1.13-fpm-alpine

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# XDEBUG Version
ENV XDEBUG_VERSION=3.2.0

RUN apk add --no-cache --update linux-headers libpng libjpeg-turbo freetype-dev libpng-dev libjpeg-turbo-dev libwebp-dev autoconf g++ make
RUN pecl install xdebug-${XDEBUG_VERSION}
RUN docker-php-ext-configure gd \
  --with-webp \
  --with-jpeg \
  --with-freetype 

RUN docker-php-ext-install gd
RUN docker-php-ext-enable xdebug
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"


# SETUP PHP-FPM CONFIG SETTINGS (max_children / max_requests)
RUN echo 'pm = dynamic' >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
  echo 'pm.start_servers = 5' >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
  echo 'pm.max_children = 50' >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
  echo 'pm.max_spare_servers = 10' >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
  echo 'pm.min_spare_servers = 5' >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
  echo 'pm.process_idle_timeout = 10s;' >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
  echo 'pm.max_requests = 500' >> /usr/local/etc/php-fpm.d/zz-docker.conf

WORKDIR /srv

COPY composer.json composer.lock ./

ENV COMPOSER_ALLOW_SUPERUSER=1 

RUN composer install --no-dev --optimize-autoloader --no-scripts --no-plugins --prefer-dist --no-progress --no-interaction

COPY . .