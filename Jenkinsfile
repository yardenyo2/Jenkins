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
                bat 'npm install'
            }
        }

        stage('Start Services') {
            steps {
                bat 'docker-compose up -d'
                bat 'ping -n 10 127.0.0.1 > nul'  // Wait for services to start
            }
        }

        stage('Run Unit Tests') {
            steps {
                bat 'npm run test:unit'
            }
        }

        stage('Run Integration Tests') {
            steps {
                bat 'npm run test:integration'
            }
        }

        stage('Stop Services') {
            steps {
                bat 'docker-compose down'
            }
        }
    }

    post {
        always {
            bat 'docker-compose down -v'
            junit 'test-results/*.xml'
        }
        success {
            bat 'echo "Pipeline completed successfully"'
        }
        failure {
            bat 'echo "Pipeline failed"'
        }
    }
} 