FROM trafex/php-nginx:latest
USER root
RUN apk update
# add useful utilities
RUN apk add curl \
  zip \
  unzip \
  ssmtp \
  tzdata 
# php, with assorted extensions we likely need
RUN apk add php8 \
  php8-fpm \
  php8-cli \
  php8-pecl-mcrypt \
  php8-soap \
  php8-openssl \
  php8-gmp \
  php8-pdo_odbc \
  php8-json \
  php8-dom \
  php8-pdo \
  php8-zip \
  php8-pdo_mysql \
  php8-sqlite3 \
  php8-pdo_pgsql \
  php8-bcmath \
  php8-gd \
  php8-odbc \
  php8-pdo_sqlite \
  php8-gettext \
  php8-xmlreader \
  php8-bz2 \
  php8-iconv \
  php8-pdo_dblib \
  php8-curl \
  php8-ctype \
  php8-phar \
  php8-xml \
  php8-common \
  php8-mbstring \
  php8-tokenizer \
  php8-xmlwriter \
  php8-fileinfo \
  php8-opcache \
  php8-simplexml \
  php8-pecl-redis


# Install composer from the official image
COPY --from=composer /usr/bin/composer /usr/bin/composer

# copying the source directory and install the dependencies with composer
RUN rm -rf /var/www/html/
COPY . /var/www/html
# Run composer install to install the dependencies
RUN composer install --optimize-autoloader --no-interaction --no-progress

RUN composer dump-autoload

RUN chown -R nobody:nobody /var/www/html

USER nobody

# COPY ./config/fly.io/configs/nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY ./deploy/fly.io/php.ini /etc/php81/conf.d/settings.ini
COPY ./deploy/fly.io/site.conf /etc/nginx/conf.d/site.conf


# EXPOSE 8080