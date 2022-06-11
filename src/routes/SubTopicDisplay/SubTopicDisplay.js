import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useLocation, useSearchParams } from 'react-router-dom';

import CommentWindow from '../../routes/CommentWindow/CommentWindow.js'

import '../../assets/css/sub_topic_display/sub_topic_display.css';

class FakeData {

    static subTopicDescription = `A descriptive paragraph is a focused and detail-rich account of a specific topic. Paragraphs in this style often have a concrete focus—the sound of a waterfall, the stench of a skunk's spray—but can also convey something abstract, such as an emotion or a memory. Some descriptive paragraphs do both. These paragraphs help readers feel and sense the details that the writer wants to convey.


    To write a descriptive paragraph, you must study your topic closely, make a list of the details you observe, and organize those details into a logical structure.
    
    Finding a Topic
    The first step in writing a strong descriptive paragraph is identifying your topic. If you received a specific assignment or already have a topic in mind, you can skip this step. If not, it's time to start brainstorming.
    
    
    Personal belongings and familiar locations are useful topics. Subjects that you care about and know well often make for rich, multilayered descriptions. Another good choice is an object that at first glance doesn't seem to warrant much description, like a spatula or a pack of gum. These seemingly innocuous objects take on entirely unexpected dimensions and meanings when captured in a well-crafted descriptive paragraph.
    
    Before you finalize your choice, consider the goal of your descriptive paragraph. If you're writing description for description's sake, you're free to choose any topic you can think of, but many descriptive paragraphs are part of a larger project, such as a personal narrative or an application essay. Make sure the topic of your descriptive paragraph aligns with the broader goal of the project.
    
    Examining and Exploring Your Topic
    After you've selected a topic, the real fun begins: studying the details. Spend time closely examining the subject of your paragraph. Study it from every possible angle, beginning with the five senses: What does the object look, sound, smell, taste, and feel like? What are your own memories of or associations with the object? 
    
    
    If your topic is larger than a single object—for example, a location or a memory—you should examine all of the sensations and experiences associated with the topic. Let's say your topic is your childhood fear of the dentist. The list of details might include your white-knuckled grip on the car door as your mother tried to drag you into the office, the gleaming white smile of the dental assistant who never remembered your name, and the industrial buzz of the electric toothbrush. 
    
    Don't worry about writing full sentences or arranging the details into a logical paragraph structure during the prewriting phase. For now, simply write down every detail that comes to mind.
    
    Organizing Your Information
    After you've compiled a lengthy list of descriptive details, you can begin assembling those details into a paragraph. First, consider again the goal of your descriptive paragraph. The details you choose to include in the paragraph, as well as the details you choose to exclude, signal to the reader how you feel about the topic. What message, if any, do you want the description to convey? Which details best convey that message? Reflect on these questions as you begin constructing the paragraph.
    
    
    Every descriptive paragraph will take a somewhat different form, but the following model is a straightforward way to get started:  
    
    A topic sentence that identifies the topic and briefly explains its significance
    Supporting sentences that describe the topic in specific, vivid ways, using the details you've listed during brainstorming
    A concluding sentence that circles back to the topic's significance
    Arrange the details in an order that makes sense for your topic. (You could easily describe a room from back to front, but that same structure would be a confusing way to describe a tree.) If you get stuck, read model descriptive paragraphs for inspiration, and don't be afraid to experiment with different arrangements. In your final draft, the details should follow a logical pattern, with each sentence connecting to the sentences that come before and after it.
    
    Showing, Not Telling
    Remember to show, rather than tell, even in your topic and concluding sentences. A topic sentence that reads, "I am describing my pen because I love to write" is obvious "telling" (the fact that you're describing your pen should be self-evident from the paragraph itself) and unconvincing (the reader cannot feel or sense the strength of your love of writing).
    
    Avoid "tell" statements by keeping your list of details handy at all times. Here's an example of a topic sentence that shows the subject's significance through the use of detail: "My ballpoint pen is my secret writing partner: The baby-soft tip glides effortlessly across the page, somehow seeming to pull my thoughts down from my brain and out through my fingertips."`;
    static one(topicId, subTopicId) {
        let subTopics = {
            details:
            {
                topicId: topicId,
                subTopicId: subTopicId,
                subTopicDescription: FakeData.subTopicDescription,
            },
        };

        return subTopics.details;
    }

    static getSubTopic(topicId, subTopicId) {
        switch (topicId) {
            case `topicItem1`:
            case `topicItem2`:
            case `topicItem3`:
            case `topicItem4`:
                return FakeData.one(topicId, subTopicId);
            default:
        }
    }
}

class SubTopicDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
        [this.searchParams, this.setSearchParams] = props.searchParams;
        this.state = {
            topicId: this.searchParams.get('topicId'),
            subTopicId: this.searchParams.get('subTopicId'),
        };
    }

    get topicId() {
        return this.state.topicId;
    }

    get subTopicId() {
        return this.state.subTopicId;
    }

    get details() {
        let details = FakeData.getSubTopic(this.topicId, this.subTopicId);
        return details;
    }

    get title() {
        return this.props.title;
    }

    get description() {
        return this.props.locState.description;
    }


    render() {
        let comp = (
            <div className="component-sub-topic-display p-2">
                <div className="sub-topic-heading-container mb-1">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-wrap">{this.title}</h4>
                        </div>
                    </div>
                </div>
                <div className="sub-topic-description-container">
                    <div className="card p-2">
                        <div className="card-body p-0">
                            <p className="card-text text-wrap">
                                {this.description}
                                <br /><br /><br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

        return comp;
    }
}

function SubTopicDisplay(props) {
    let searchParams = useSearchParams();
    let loc = useLocation();

    useEffect(() => {
        //console.log(loc);
        //let a, b;
        //[a, b] = searchParams;
        //console.log(searchParams);
    }, [loc]);

    return (
        <>
            <SubTopicDisplayComponent
                {...props}
                searchParams={searchParams}
                locState={loc.state}
                title={loc.state.subTopicTitle} />
            <CommentWindow searchParams={searchParams} locState={loc.state} key={new Date().getTime()}  />
        </>
    );
}

export default SubTopicDisplay;