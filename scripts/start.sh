#!/bin/bash
cd /home/ubuntu/tip-talk/server
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export GRANT_TYPE=$(aws ssm get-parameters --region ap-northeast-2 --names GRANT_TYPE --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export S3_ACCESS_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names S3_ACCESS_KEY --query Parameters[0].Value | sed 's/"//g')
export S3_SECRET_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names S3_SECRET_KEY --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export MAIL_ID=$(aws ssm get-parameters --region ap-northeast-2 --names MAIL_ID --query Parameters[0].Value | sed 's/"//g')
export MAIL_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names MAIL_PASSWORD --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js