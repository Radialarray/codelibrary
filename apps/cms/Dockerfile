FROM php:8.1-fpm-alpine

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# RUN apk add --no-cache autoconf openssl-dev pcre-dev icu-dev zlib-dev freetype libzip-dev libpng libjpeg-turbo freetype-dev libpng-dev libjpeg-turbo-dev && \
#   docker-php-ext-configure gd --with-freetype --with-jpeg && \
#   docker-php-ext-install -j${NPROC} gd bcmath intl opcache zip sockets && \
#   # apk del --no-cache freetype-dev libpng-dev libjpeg-turbo-dev && \
#   mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

RUN apk add --no-cache libpng libpng-dev && docker-php-ext-install gd && apk del libpng-dev && \
  mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"


WORKDIR /srv

# Set user and group
# ARG USER=default
# Create the user
# add new user
# RUN adduser -D $USER \
#   && mkdir -p /etc/sudoers.d \
#   && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
#   && chmod 0440 /etc/sudoers.d/$USER

COPY composer.json composer.lock ./

ENV COMPOSER_ALLOW_SUPERUSER=1 

RUN composer install --no-dev --optimize-autoloader --no-scripts --no-plugins --prefer-dist --no-progress --no-interaction

COPY . .

# ENV APP_ENV=prod
# ENV PORT=80
