pipeline {
    agent any
    stages {
        stage('Staging Deployment') {
            when {
                branch 'staging'
            }
            steps {
                echo 'Tonote Api Staging Deploy Stage'
                sh 'ssh stage@54.77.211.177 "cd tonate-notary && git stash && git pull origin staging && npm install && npm run build && pm2 restart tonate-notary"'
            }
        }
        stage('Development Deploy') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Tonote Api Development Deploy Stage'
                sh 'ssh dev@54.77.211.177 "cd tonate-notary && git stash && git pull origin develop && npm install && npm run build && pm2 restart tonote-notary"'
            }
        }
    }
}
