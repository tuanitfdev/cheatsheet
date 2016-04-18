<?php
/**
 * Created by PhpStorm.
 * User: TUAN
 * Date: 11/21/2015
 * Time: 2:26 PM
 */
class Default_layout_controller extends CI_Controller {
    protected $layout_template;

    public function __construct() {
        parent::__construct();
        $this->layout_template = $this->config->item('default_layout');
    }
}