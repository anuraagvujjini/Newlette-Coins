mvn clean
git pull -r
mvn package -DskipTests -Penv-prod
sudo service tomcat7 stop
sudo rm -rf /usr/share/tomcat7/webapps/ROOT
sudo rm -rf /usr/share/tomcat7/webapps/ROOT.war
sudo mv target/newlette*.war /usr/share/tomcat7/webapps/ROOT.war
sudo service tomcat7 start