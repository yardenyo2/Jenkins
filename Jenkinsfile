pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Test Batch') {
            steps {
                bat 'echo "Starting the pipeline"'
                bat 'dir'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    // נתקין רק אם יש package.json
                    bat 'if exist package.json npm install'
                }
            }
        }

        stage('Start Services') {
            steps {
                // נבדוק אם Docker זמין לפני שנפעיל
                bat '''
                    docker --version || exit /b 0
                    %DOCKER_COMPOSE% up -d
                    ping -n 10 127.0.0.1 > nul
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                dir('backend') {
                    bat 'if exist package.json npm run test:unit'
                }
            }
        }

        stage('Run Integration Tests') {
            steps {
                dir('backend') {
                    bat 'if exist package.json npm run test:integration'
                }
            }
        }

        stage('Stop Services') {
            steps {
                bat '%DOCKER_COMPOSE% down || exit /b 0'
            }
        }
    }

    post {
        always {
            // גם אם נכשל, ננסה לסגור את הסביבה
            bat '%DOCKER_COMPOSE% down -v || exit /b 0'
            // נפרסם תוצאות טסטים אם יש
            junit allowEmptyResults: true, testResults: 'backend/test-results/*.xml'
        }
        success {
            bat 'echo "✅ Pipeline completed successfully"'
        }
        failure {
            bat 'echo "❌ Pipeline failed"'
        }
    }
}
