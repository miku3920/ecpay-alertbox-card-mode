#!/bin/bash

if [ ! -f .env ]; then
  cp .env.example .env
fi

cp ./docker/.bashrc ~/.bashrc
source ~/.bashrc

sudo apt update
sudo apt install -y xauth xvfb

npm i -g npm pnpm

pnpm i
pnpm playwright install chromium --with-deps

sudo apt -y autoremove
sudo apt clean
sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
