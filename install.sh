echo 'myVerses Installer started'
echo 'Installing System Requirements'
sudo apt-get install -y git build-essential
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
echo 'Cloning Source Code into /opt/myVerses'
cd /opt
sudo mkdir -p /opt/myVerses
sudo chmod 755 myVerses
cd myVerses
git clone https://github.com/WebDaD/myVerses.git .
echo 'Deploying App'
sudo npm run deploy -s
