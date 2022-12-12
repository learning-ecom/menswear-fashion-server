echo ===================================================
echo Autodeploy server
echo ===================================================
echo Connecting to remote server...
ssh adzo-prod  'bash -i'  <<-'ENDSSH'
    #Connected
    cd pleat-server/
    git pull origin dev
    npm install
    pm2 stop pleat
    pm2 start ecosystem.config.js
    pm2 logs pleat
    # exit