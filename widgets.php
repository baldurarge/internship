<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package hr-skyen
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */


class Hr_Skyen_Countdown_Widget extends WP_Widget{
    //Widget name, description

    public function __construct() {
        $widget_options = array(
            'classname' => 'hr-skyen-countdown-widget',
            'description' => 'custom Hr-skyen countdown clock widget'
        );
        parent::__construct( 'hr-coundown-clock', 'Hr-coundownclock', $widget_options );
    }


    // backend display of widget

    public function form( $instance ){
        $date = '';
        if( !empty( $instance['date'] ) ) {
            $date = $instance['date'];
        }
    
        $color = '';
        if( !empty( $instance['color'] ) ) {
            $color = $instance['color'];
        }

        $textColor = '';
        if( !empty( $instance['textColor'] ) ) {
            $textColor = $instance['textColor'];
        }
        
    
        ?>
        <p>
            <label for="<?php echo $this->get_field_name( 'date' ); ?>">Date: this style -> "May 25, 2018 00:00:00"</label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'date' ); ?>" name="<?php echo $this->get_field_name( 'date' ); ?>" type="text" value="<?php echo esc_attr( $date ); ?>" />
        </p>
    
        <p>
            <label for="<?php echo $this->get_field_name( 'color' ); ?>">Hexcode -> <?php _e( 'color:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'color' ); ?>" name="<?php echo $this->get_field_name( 'color' ); ?>" type="text" value="<?php echo esc_attr( $color ); ?>" />
        </p>

        <p>
            <label for="<?php echo $this->get_field_name( 'textColor' ); ?>">Hexcode -> <?php _e( 'textColor:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'textColor' ); ?>" name="<?php echo $this->get_field_name( 'textColor' ); ?>" type="text" value="<?php echo esc_attr( $textColor ); ?>" />
        </p>

    <?php
    }



    //frontend display of widget

    public function widget( $arg, $instance ){
        echo $arg['before_widget'];
        ?>
        <style>
        .the-countdown-clock {
        display: flex;
        flex-flow: row;
        width: 100%;
        justify-content: space-between; }
        .the-countdown-clock .each-clock {
            height: 150px;
            width: 150px;
            background: transparent;
            border-radius: 50%;
            box-shadow: rgba(33, 33, 33, 0.209) 0px 2px 4px 0px;
            position: relative; }
            .the-countdown-clock .each-clock .number {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'bebas_neuebook';
            font-size: 50px; }
            .the-countdown-clock .each-clock .type {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, 0);
            font-family: 'HelveticaNeueLTStd45Light', sans-serif;
            font-size: 15px; }
        .the-countdown-clock .black-clock {
            border: 5px solid black;
            color: black; }
        .the-countdown-clock .white-clock {
            border: 5px solid #f1f1f1;
            color: #f1f1f1; }
        .the-countdown-clock .blue-clock {
            border: 5px solid #2499CC;
            color: #2499CC; }
        .the-countdown-clock .orange-clock {
            border: 5px solid #FD993E;
            color: #FD993E; }

        @media screen and (max-width: 505px) {
        .the-countdown-clock {
            display: flex;
            flex-flow: row;
            width: 100%;
            justify-content: space-around;
            flex-wrap: wrap; }
            .the-countdown-clock .each-clock {
            margin-top: 10px;
            width: 130px;
            height: 130px; }
            .the-countdown-clock .each-clock .number {
                font-size: 40px; }
            .the-countdown-clock .each-clock .type {
                font-size: 12px; } }

        </style>
        <script>
        window.onload = function() {
        var date = document.getElementById('theDate').innerHTML;
        var countDownDate = new Date(date).getTime();


        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
            

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("days").innerHTML = 0;
                document.getElementById("hours").innerHTML = 0;
                document.getElementById("minutes").innerHTML = 0;
                document.getElementById("seconds").innerHTML = 0;
            }
            }, 1000);

        }

        </script>
        <div id="theDate" hidden><?php echo esc_html( $instance['date'] ) ?></div>
        <div class="around-clock">

            <div class="the-countdown-clock">
                <div class="each-clock days white-clock" style="border: 5px solid <?php echo esc_html( $instance['color'] ) ?>;"><div class="number" id="days" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;"></div><div class="type" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;">Days</div></div>
                <div class="each-clock hours white-clock" style="border: 5px solid <?php echo esc_html( $instance['color'] ) ?>;"><div class="number" id="hours" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;"></div><div class="type" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;">Hours</div></div>
                <div class="each-clock minuts white-clock" style="border: 5px solid <?php echo esc_html( $instance['color'] ) ?>;"><div class="number" id="minutes" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;"></div><div class="type" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;">minutes</div></div>
                <div class="each-clock seconds white-clock" style="border: 5px solid <?php echo esc_html( $instance['color'] ) ?>;"><div class="number" id="seconds" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;"></div><div class="type" style="color:<?php echo esc_html( $instance['textColor'] ) ?>;">Seconds</div></div>
            </div>
        </div>
        
                <?php
                    echo $args['after_widget'];
            }



            public function update( $new_instance, $old_instance ) {
                return $new_instance;
            }



}

class HR_Skyen_Hide_Blog_widget extends WP_Widget{
    public function __construct() {
        
        
        $widget_options = array(
            'classname' => 'hr-skyen-hide-blogs',
            'description' => 'custom Hr-skyen to hide the blogs on the bottom'
        );
        parent::__construct( 'hr-hide-blogs', 'Hr-hide-blogs', $widget_options );

    }
        public function form( $instance ){

        }

        public function widget( $arg, $instance ){
            echo $arg['before_widget'];
            ?>
    
            
        <style>
            .moreposts{
                display: none !important;
            }
            body {
                padding-top: 35px;
            }
            .entry-content{
                margin-top:0px;
            }
        </style>

        <?php
        echo $args['after_widget'];
    }




    
}





class Hr_Skyen_Text_with_image extends WP_Widget{
    //Widget name, description

    public function __construct() {
        
        
        $widget_options = array(
            'classname' => 'hr-skyen-text-with-image',
            'description' => 'custom Hr-skyen text with image next to it widget'
        );
        parent::__construct( 'hr-text-with-image', 'Hr-text-with-image', $widget_options );

    }


    // backend display of widget

    public function form( $instance ){
        $title = '';
        if( !empty( $instance['title'] ) ) {
            $title = $instance['title'];
        }
    
        $description = '';
        if( !empty( $instance['description'] ) ) {
            $description = $instance['description'];
        }

        $link = '';
        if( !empty( $instance['link'] ) ) {
            $link = $instance['link'];
        }
        
    
        ?>
        <p>
            <label for="<?php echo $this->get_field_name( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
        </p>
    
        <p>
            <label for="<?php echo $this->get_field_name( 'description' ); ?>"><?php _e( 'Description:' ); ?></label>
            <textarea class="widefat" id="<?php echo $this->get_field_id( 'description' ); ?>" name="<?php echo $this->get_field_name( 'description' ); ?>" type="text" ><?php echo esc_attr( $description ); ?></textarea>
        </p>

        <p>
            <label for="<?php echo $this->get_field_name( 'link' ); ?>"><?php _e( 'link:' ); ?></label>
            <textarea class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" type="text" ><?php echo esc_attr( $link ); ?></textarea>
        </p>
    
    <?php
    }



    //frontend display of widget

    public function widget( $arg, $instance ){
        echo $arg['before_widget'];
        ?>

        
    <style>
    
        .the-text-with-image div{
            display:flex;
            flex-flow:row;
            align-items:center;
            justify-content:center;
        }

        .the-text-with-image div img{
            width:50px;
            height:50px;
            margin-left:10px;
        }
        .the-text-with-image p{
            text-align:center;
        }


    </style>

    <div class="the-text-with-image">
        <div>
            <h2><?php echo esc_html( $instance['title'] ) ?></h2>
            <img src="<?php echo esc_html( $instance['link'] ) ?>" alt="">
        </div>
        <p><?php echo esc_html( $instance['description'] ) ?><p>
    </div>
        <?php
            echo $args['after_widget'];
    }



    public function update( $new_instance, $old_instance ) {
        // $instance = $old_instance;
        // $instance[ 'title' ] = strip_tags( $new_instance[ 'title' ] );
        return $new_instance;
      }



}






add_action( 'widgets_init', function() {
    register_widget( 'Hr_Skyen_Countdown_Widget' );
    register_widget( 'Hr_Skyen_Text_with_image' );
    register_widget( 'HR_Skyen_Hide_Blog_widget' );
    
});
 ?>