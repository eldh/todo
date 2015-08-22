echo 'Setting up shop…\n\n'
npm i
cd api
virtualenv flask
flask/bin/pip install flask
cd ..
echo '\n\nAll done! `npm run dev` will start the dev server.  `npm run api` starts the api.'
