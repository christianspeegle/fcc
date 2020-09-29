if [ -f "timestamp.zip" ]; then
  rm timestamp.zip
fi

find ./timestamp -maxdepth 1 -type f -print0 | xargs -0 zip timestamp.zip
scp timestamp.zip bastion@bastionofshadows.com:
ssh bastion@bastionofshadows.com "rm -r ~/fcc.christianspeegle.com/timestamp"
ssh bastion@bastionofshadows.com "unzip ~/timestamp.zip -d ~/fcc.christianspeegle.com"
ssh bastion@bastionofshadows.com "npm --prefix ~/fcc.christianspeegle.com/timestamp i"
ssh bastion@bastionofshadows.com "rm ~/timestamp.zip"