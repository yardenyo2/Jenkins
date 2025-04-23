pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Start Services') {
            steps {
                bat "${DOCKER_COMPOSE} up -d mysql"
                // Wait for MySQL to be ready
                bat 'ping 127.0.0.1 -n 10 > nul'
            }
        }

        stage('Run Unit Tests') {
            steps {
                dir('backend') {
                    bat 'npm run test:unit'
                }
            }
        }

        stage('Run Integration Tests') {
            steps {
                dir('backend') {
                    bat 'npm run test:integration'
                }
            }
        }

        stage('Stop Services') {
            steps {
                bat "${DOCKER_COMPOSE} down"
            }
        }
    }

    post {
        always {
            // Clean up
            bat "${DOCKER_COMPOSE} down -v"

            // Publish test results
            junit 'backend/junit.xml'
        }
    }
}
