# Meta

## 属性

* charset  
  charset="UTF-8"
* content  
  此属性包含http-equiv 或name 属性的值，具体取决于所使用的值。
* http-equiv  
  这个枚举属性定义了能改变服务器和用户引擎行为的编译。这个编译值使用content 来定义，如下：
  * content-language
  * content-security-policy
  * content-type
  * default-style
  * refresh
  * set-cookie
* name  
  定义文档级元数据的名称. 如果以下其中一个属性设置了itemprop, http-equiv or charset ，就不能在设置这个属性了。
  * application-name，定义正运行在该网页上的网络应用名称；
  * author  
    name="author" content="whosmeya"
  * description
  * generator, 包含生成页面的软件的标识符。
  * keywords
  * viewport, 它提供有关视口初始大小的提示，仅供移动设备使用。
    * width
      一个正整数或者字符串 device-width
    * height
      一个正整数或者字符串 device-height
    * initial-scale  
      一个0.0 到10.0之间的正数
    * maximum-scale
    * minimum-scale
    * user-scalable  
      是否允许缩放, 一个布尔值（yes 或者no）  
      name="viewport" content="width=width-device, initial-scale=1.0, user-scalable=no"
* scheme
  删
  