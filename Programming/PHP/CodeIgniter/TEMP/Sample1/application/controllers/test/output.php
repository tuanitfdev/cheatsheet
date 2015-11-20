<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Output extends CI_Controller {
    public function index() {
        $data['name'] = 'tuan';
        $this->load->view('test/output_view', $data);
    }
}
