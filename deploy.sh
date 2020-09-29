if [ -f "app.zip" ]; then
  rm app.zip
fi

zip app.zip package.json package-lock.json
find ./app -type f -print0 | xargs -0 zip app.zip
scp app.zip bastion@bastionofshadows.com:
ssh bastion@bastionofshadows.com "rm -r ~/fcc.christianspeegle.com"
ssh bastion@bastionofshadows.com "unzip ~/app.zip -d ~/fcc.christianspeegle.com"
ssh bastion@bastionofshadows.com "npm --prefix ~/fcc.christianspeegle.com i --only=production"
ssh bastion@bastionofshadows.com "rm ~/app.zip"