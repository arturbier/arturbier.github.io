// =====================================================
// UniversalSDK
// Construct 3 adapter
// VK Games / OK Games / Yandex Games / Local
// =====================================================


window.UniversalSDK = {


    platform: "unknown",

    sdk: null,

    player: null,


    debug: true,


    // LOCAL TEST ADS

    mockAds:true,

    mockBanner:null,





    log(text){

        if(this.debug)

            console.log(
                "[SDK]",
                text
            );

    },








    // ==========================
    // INIT
    // ==========================


    async init(){


        this.log(
            "Init start"
        );



        let root = window;


        let parent =
        window.parent || window;





        // =====================
        // VK
        // =====================


        let vk =
        root.vkBridge ||
        parent.vkBridge;



        if(vk){


            this.platform="vk";

            this.sdk=vk;



            try{


                await vk.send(
                    "VKWebAppInit"
                );


                this.log(
                    "VK ready"
                );


                return true;


            }catch(e){

                console.error(e);

            }


        }







        // =====================
        // YANDEX
        // =====================


        let ya =
        root.YaGames ||
        parent.YaGames;



        if(ya){


            this.platform="yandex";



            try{


                this.sdk =
                await ya.init();



                this.log(
                    "Yandex ready"
                );


                return true;



            }catch(e){

                console.error(e);

            }


        }







        // =====================
        // OK
        // =====================


        let ok =
        root.FAPI ||
        parent.FAPI;



        if(ok){


            this.platform="ok";

            this.sdk=ok;



            this.log(
                "OK ready"
            );


            return true;


        }








        // =====================
        // LOCAL
        // =====================


        this.platform="local";


        this.log(
            "Local mode"
        );


        return true;


    },









    getPlatform(){


        return this.platform;


    },









    // =====================================================
    // LOCAL MOCK ADS
    // =====================================================



    showMockBanner(){


        if(this.mockBanner)

            return;



        let div =
        document.createElement(
            "div"
        );



        div.innerHTML =
        "TEST BANNER AD";



        Object.assign(
            div.style,
            {

            position:"fixed",

            bottom:"0",

            left:"0",

            width:"100%",

            height:"70px",

            background:"#222",

            color:"#fff",

            display:"flex",

            alignItems:"center",

            justifyContent:"center",

            fontSize:"24px",

            zIndex:"99999"

            }

        );



        document.body.appendChild(
            div
        );



        this.mockBanner=div;



    },







    hideMockBanner(){


        if(this.mockBanner){


            this.mockBanner.remove();


            this.mockBanner=null;


        }


    },







    async showMockInterstitial(){



        return new Promise(resolve=>{


            let div =
            document.createElement(
                "div"
            );



            div.innerHTML =
            `

            <h1>
            TEST INTERSTITIAL
            </h1>

            <h2 id="sdkTimer">
            3
            </h2>

            `;



            Object.assign(
                div.style,
                {

                position:"fixed",

                top:"0",

                left:"0",

                width:"100%",

                height:"100%",

                background:"#000",

                color:"#fff",

                display:"flex",

                flexDirection:"column",

                alignItems:"center",

                justifyContent:"center",

                zIndex:"99999"

                }

            );



            document.body.appendChild(
                div
            );



            let t=3;



            let timer =
            setInterval(()=>{


                t--;


                div.querySelector(
                    "#sdkTimer"
                ).innerHTML=t;



                if(t<=0){


                    clearInterval(timer);


                    div.remove();


                    resolve();


                }


            },1000);



        });



    },









    async showMockRewarded(
        onReward,
        onClose
    ){



        return new Promise(resolve=>{


            let div =
            document.createElement(
                "div"
            );



            div.innerHTML =
            `

            <h1>
            TEST REWARDED VIDEO
            </h1>


            <h2 id="rewardTimer">
            5
            </h2>


            `;



            Object.assign(
                div.style,
                {

                position:"fixed",

                top:"0",

                left:"0",

                width:"100%",

                height:"100%",

                background:"#111",

                color:"#fff",

                display:"flex",

                flexDirection:"column",

                alignItems:"center",

                justifyContent:"center",

                zIndex:"99999"

                }

            );



            document.body.appendChild(
                div
            );



            let t=5;



            let timer =
            setInterval(()=>{


                t--;


                div.querySelector(
                    "#rewardTimer"
                ).innerHTML=t;



                if(t<=0){


                    clearInterval(timer);



                    div.remove();



                    console.log(
                        "MOCK REWARD SUCCESS"
                    );



                    if(onReward)

                        onReward();



                    if(onClose)

                        onClose();



                    resolve();


                }



            },1000);



        });



    },









    // =====================================================
    // INTERSTITIAL
    // =====================================================


    async showInterstitial(){



        this.log(
            "Interstitial"
        );




        if(this.platform==="local"){


            if(this.mockAds)

                await this.showMockInterstitial();



            return;


        }






        if(this.platform==="yandex"){


            await this.sdk.adv
            .showFullscreenAdv({

                callbacks:{


                    onClose(){

                        console.log(
                            "closed"
                        );


                    }


                }


            });



        }






        else if(this.platform==="vk"){


            await this.sdk.send(

                "VKWebAppShowNativeAds",

                {

                ad_format:
                "interstitial"

                }

            );


        }





    },









    // =====================================================
    // REWARDED
    // =====================================================


    async showRewarded(
        onReward,
        onClose,
        onError
    ){



        this.log(
            "Rewarded"
        );






        if(this.platform==="local"){



            await this.showMockRewarded(
                onReward,
                onClose
            );


            return;


        }







        if(this.platform==="yandex"){



            try{


                await this.sdk.adv
                .showRewardedVideo({

                    callbacks:{


                        onReward(){


                            if(onReward)

                                onReward();


                        },


                        onClose(){


                            if(onClose)

                                onClose();


                        },


                        onError(e){


                            if(onError)

                                onError(e);


                        }


                    }


                });



            }catch(e){


                if(onError)

                    onError(e);


            }



        }






        else if(this.platform==="vk"){



            try{


                let result =
                await this.sdk.send(

                    "VKWebAppShowNativeAds",

                    {

                    ad_format:
                    "reward"

                    }

                );



                if(result){


                    if(onReward)

                        onReward();


                }



            }catch(e){


                if(onError)

                    onError(e);


            }



        }



    },









    // =====================================================
    // BANNER
    // =====================================================


    async showBanner(){



        this.log(
            "Banner"
        );



        if(this.platform==="local"){


            this.showMockBanner();


            return;


        }





    },






    async hideBanner(){



        if(this.platform==="local"){


            this.hideMockBanner();


        }


    },









    // =====================================================
    // SAVE
    // =====================================================


    async save(data){


        localStorage.setItem(

            "save",

            JSON.stringify(data)

        );



        this.log(
            "Saved"
        );



        if(this.platform==="yandex"){


            let player =
            await this.sdk.getPlayer();



            await player.setData(
                data
            );


        }


    },








    // =====================================================
    // LOAD
    // =====================================================


    async load(){



        if(this.platform==="yandex"){


            try{


                let player =
                await this.sdk.getPlayer();



                let data =
                await player.getData();



                if(data)

                    return data;



            }catch(e){}



        }





        let save =
        localStorage.getItem(
            "save"
        );



        if(save)

            return JSON.parse(save);



        return {};

    }




};