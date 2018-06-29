node('master') {
    docker.withServer('unix:///var/run/docker.sock') {
        stage('Git clone') {
            git 'git@github.com:prefeiturasp/SME-plataforma-curriculo-interface.git'
        }
        stage('Build') {
            docker
                .image('jenkins-agent-ubuntu')
                .inside('--volumes-from jenkins-master') {
                    sh "bash ./build.sh;"
                }
        }
        stage('Build') {
            docker
                .image('interface')
                .inside('--volumes-from jenkins-master') {
                    sh "bash ./build.sh;"
                }
        }
    }
}