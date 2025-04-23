pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Start Services') {
            steps {
                sh "${DOCKER_COMPOSE} up -d mysql"
                // Wait for MySQL to be ready
                sh 'sleep 10'
            }
        }

        stage('Run Unit Tests') {
            steps {
                dir('backend') {
                    sh 'npm run test:unit'
                }
            }
        }

        stage('Run Integration Tests') {
            steps {
                dir('backend') {
                    sh 'npm run test:integration'
                }
            }
        }

        stage('Stop Services') {
            steps {
                sh "${DOCKER_COMPOSE} down"
            }
        }
    }

    post {
        always {
            // Clean up
            sh "${DOCKER_COMPOSE} down -v"
            
            // Publish test results
            junit 'backend/junit.xml'
        }
    }
} 