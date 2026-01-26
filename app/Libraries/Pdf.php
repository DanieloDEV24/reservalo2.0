<?php
namespace App\Libraries;

class Pdf
{
    protected $mpdf;
    
    public function __construct($config = [])
    {
        // Incluir el autoloader de mPDF
        require_once APPPATH . 'ThirdParty/mpdf/vendor/autoload.php';
        
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
        // I = inline (navegador), D = download, F = guardar archivo, S = string
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