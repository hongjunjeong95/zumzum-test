#!/bin/sh

# Wait for MySQL to be ready
until mysqladmin ping -h"zumzum-mysql" --silent; do
    echo "Waiting for MySQL to be ready..."
    sleep 2
done

# Connect to MySQL and execute commands
mysql -uroot -p"$MYSQL_ROOT_PASSWORD" <<EOF
create database $MYSQL_DATABASE;
use $MYSQL_DATABASE;
grant all privileges on $MYSQL_DATABASE.* to '$MYSQL_USER'@'localhost' identified by '$MYSQL_PASSWORD';
EOF

echo "MySQL setup completed."
