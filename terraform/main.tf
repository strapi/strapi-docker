provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "allow_ssh_http" {
  vpc_id = "vpc-06f8a182e879ab573"  # Replace with your VPC ID

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "strapi" {
  ami           = "ami-04b70fa74e45c3917"  # Amazon Linux 2 AMI
  instance_type = "t2.micro"
  security_groups = [aws_security_group.allow_ssh_http.name]

  tags = {
    Name = "StrapiApp"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "sudo amazon-linux-extras install docker",
      "sudo service docker start",
      "sudo usermod -a -G docker ec2-user",
      "sudo yum install -y git",
      "git clone https://github.com/venkey3413/strapi-docker.git",
      "cd strapi-docker",
      "sudo docker-compose up -d"
    ]
  }
}

output "instance_ip" {
  value = aws_instance.strapi.public_ip
}
