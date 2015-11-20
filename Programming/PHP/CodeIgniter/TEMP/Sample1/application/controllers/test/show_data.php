<?php
/**
 * Created by PhpStorm.
 * User: TUAN
 * Date: 12/9/2014
 * Time: 11:01 PM
 */
class Show_data extends CI_Controller {

    public function index() {
        // show movie data
        $dt = Array();
        for ($i = 0; $i < 1000; $i++) {
            $dt[$i]['id'] = $i;
            $dt[$i]['title'] = 'Movie title ' . $i;
            $dt[$i]['desc'] = 'Movie description ' . $i;
            $dt[$i]['price'] = $i * 1000;
        }
        $data['dt'] = $dt;
        $this->load->view('test/show_data_view', $data);
    }
}
