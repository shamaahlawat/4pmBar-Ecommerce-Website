rm -R 4pmbar/
npm run build
mv dist 4pmbar/
rm 4pmbar.zip
zip -r 4pmbar.zip 4pmbar/
scp 4pmbar.zip ubuntu@poletalks.com:~/
ssh ubuntu@poletalks.com