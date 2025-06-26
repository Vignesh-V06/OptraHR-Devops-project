pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github-token-vignesh', branch: 'OptraHR-Devops-project', url: 'https://github.com/Vignesh-V06/OptraHR-Devops-project.git'
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

        stage('Push changes to GitHub') {
            steps {
            withCredentials([usernamePassword(credentialsId: 'github-token-vignesh', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
            sh '''
            git config user.email "v.vigneshvit06@gmail.com"
            git config user.name "Vignesh-V06"
            git add .
            git diff-index --quiet HEAD || git commit -m "Automated update from Jenkins"
            git remote set-url origin https://${GIT_USER}:${GIT_PASS}@github.com/Vignesh-V06/OptraHR-Devops-project.git
            git push origin OptraHR-Devops-project
            '''
        }
    }
}

    }

    post {
        success {
            echo '✅ Deployment + Push completed successfully!'
        }
        failure {
            echo '❌ Deployment failed. Check Ansible logs.'
        }
    }
}

