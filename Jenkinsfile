node('master') {
    docker.withServer('unix:///var/run/docker.sock') {
        stage('Git clone') {
            sh 'git clone --recurse-submodules -j8 -b staging git@github.com:prefeiturasp/SME-plataforma-curriculo.git'
            sh 'cd interface && git checkout staging && cd ..'
            sh 'cd api && git checkout staging && cd ..'
        }

    }
}