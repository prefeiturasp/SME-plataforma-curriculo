def project_name = "SME-plataforma-curriculo"
node('master') {
    stage('Git checkout master') {
        if (!fileExists('SME-plataforma-curriculo')) {
            sh 'git clone --recurse-submodules -j8 -b staging git@github.com:prefeiturasp/SME-plataforma-curriculo.git'
        }
        sh 'cd SME-plataforma-curriculo && git checkout staging && git pull'
    }
    dir('SME-plataforma-curriculo') {
        stage('Git checkout interface'){
            sh 'cd interface && git checkout staging && git pull'
        }
        stage('Git checkout api'){
            sh 'cd api && git checkout docker-new-setup && git pull'
        }
        stage('Build docker interface'){
            echo pwd()
            sh 'cp -r /tmp/env/. .' 
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
        stage('Up nginx docker'){
            sh 'docker-compose up nginx'
        }

    }
}