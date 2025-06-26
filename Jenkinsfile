pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'OptraHR-Devops-project', url: 'https://github.com/Vignesh-V06/OptraHR-Devops-project.git'
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                ansiblePlaybook(
                    playbook: 'ansible/playbook.yml',
                    inventory: 'ansible/inventory.ini',
                    become: true
                )
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Deployment failed. Check Ansible logs.'
        }
    }
}

