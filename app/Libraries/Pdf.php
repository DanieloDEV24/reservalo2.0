<?php
namespace App\Libraries;

class Pdf
{
    protected $mpdf;
    
    public function __construct($config = [])
    {
        // CAMBIA ESTA LÍNEA - El vendor está en la raíz del proyecto
        require_once ROOTPATH . 'vendor/autoload.php';
        
        $defaultConfig = [
            'mode' => 'utf-8',
            'format' => 'A4',
            'margin_top' => 10,
            'margin_bottom' => 10,
            'margin_left' => 10,
            'margin_right' => 10,
            'tempDir' => WRITEPATH . 'cache'
        ];
        
        $config = array_merge($defaultConfig, $config);
        
        $this->mpdf = new \Mpdf\Mpdf($config);
    }
    
    public function writeHTML($html)
    {
        $this->mpdf->WriteHTML($html);
    }
    
    public function output($filename = 'documento.pdf', $dest = 'I')
    {
        return $this->mpdf->Output($filename, $dest);
    }
    
    public function setHeader($header)
    {
        $this->mpdf->SetHeader($header);
    }
    
    public function setFooter($footer)
    {
        $this->mpdf->SetFooter($footer);
    }
}