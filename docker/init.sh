#!/bin/bash

if [ ! -f .env ]; then
  cp .env.example .env
fi

cp ./docker/.bashrc ~/.bashrc
source ~/.bashrc

sudo apt update
sudo apt install -y xauth xvfb

if ! command -v actionlint &> /dev/null; then
  sudo wget -O /usr/local/bin/actionlint https://github.com/rhysd/actionlint/releases/latest/download/actionlint_linux_amd64
  sudo chmod +x /usr/local/bin/actionlint
fi

npm i -g npm pnpm

pnpm i
pnpm playwright install chromium --with-deps

sudo apt -y autoremove
sudo apt clean
sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
