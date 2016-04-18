<?php
/**
 * Created by PhpStorm.
 * User: TUAN
 * Date: 1/17/2015
 * Time: 4:00 PM
 */

class Movie_category_ctrl extends CI_Controller {
    protected $layout_template;

    public function __construct() {
        parent::__construct();
        $this->_layout = $this->config->item('m_layout');
    }

    public function index() {
        $data = array();
        $data['view'] = 'movies/movie_category/movie_category_default';
        $data['view_data'] = array();
        $data['view_data']['user_name'] = 'Tuan Le';
        $this->load->view($this->layout_template, $data);
    }

}