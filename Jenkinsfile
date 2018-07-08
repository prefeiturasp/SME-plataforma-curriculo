def project_name = "SME-plataforma-curriculo"
node('master') {
    dir("${env.APP_ROOT}") {
        stage('Git checkout master') {
            sh 'git checkout staging && git pull'
        }
        stage('Git checkout interface'){
            sh 'cd interface && git checkout staging && git pull'
        }
        stage('Set API URL'){
            sh 'echo "export const API_URL = \'$API_URL\'" > interface/src/constants.js'
        }
        stage('Git checkout api'){
            sh 'cd api && git checkout docker-new-setup && git pull'
        }
        stage('Stop containers'){
            sh 'docker-compose stop && yes y | docker-compose rm'
        }
        stage('Build docker interface'){
            sh 'docker-compose build interface'
        }
        stage('Build docker postgresql'){
            sh 'docker-compose build postgresql'
        }
        stage('Build docker api'){
            sh 'docker-compose build api'
        }
        stage('Build docker nginx'){
            sh 'docker-compose build nginx'
        }
        stage('Up docker containers'){
            sh 'docker-compose up -d'
        }
        stage('Run migrations'){
            sh 'docker-compose exec -T api bundle exec rake db:migrate'
        }
    }
}