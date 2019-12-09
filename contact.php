<?php
/* Informa o nível dos erros que serão exibidos 
error_reporting(E_ALL);

Habilita a exibição de erros 
ini_set("display_errors", 1);*/

if (isset($_POST['button'])) {
 
 //Variaveis de POST, Alterar somente se necessário 
 //====================================================
 $nome      = $_POST['nome'];
 $email     = $_POST['email'];
 $city      = $_POST['city']; 
 $state     = $_POST['state'];
 $main      = $_POST['main'];
 $message   = $_POST['message'];

 //====================================================
 
 //REMETENTE --> ESTE EMAIL TEM QUE SER VALIDO DO DOMINIO
 //==================================================== 
 $email_remetente = "contato@epd.com.br"; // deve ser uma conta de email do seu dominio 
 //====================================================
 
 //Configurações do email, ajustar conforme necessidade
 //==================================================== 
 $email_destinatario = "nathalivallier@gmail.com"; // pode ser qualquer email que receberá as mensagens
 $email_reply = "$email"; 
 $email_assunto = "Contato da página EPD"; // Este será o assunto da mensagem
 //====================================================
 
 //Monta o Corpo da Mensagem
 //====================================================
 $email_conteudo = "Nome completo: $nome \n"; 
 $email_conteudo .= "E-mail: $email \n";
 $email_conteudo .= "Cidade: $city \n";
 $email_conteudo .= "Estado: $state \n";
 $email_conteudo .= "Assunto do e-mail:  $main \n";
 $email_conteudo .= "Mensagem: $message";
 //====================================================
 
 //Seta os Headers (Alterar somente caso necessario) 
 //==================================================== 
 $email_headers = implode ( "\n",array ( "From: $email_remetente", "Reply-To: $email_reply", "Return-Path: $email_remetente","MIME-Version: 1.0","X-Priority: 3","Content-Type: text/html; charset=UTF-8" ) );
 //====================================================
 
 //Enviando o email 
 //==================================================== 
 if (mail ($email_destinatario, $email_assunto, nl2br($email_conteudo), $email_headers)){ 
 echo "<script type='text/javascript'> alert('Contato Enviado com Sucesso!'); window.location.href='index.php'; </script>";
 } 
 else{ 
 echo "</b>Falha no envio do e-mail!</b>"; } 
 //====================================================
}