import {NodeHolder} from "../../../src/model/NodeHolder";
import {TaskFactory} from "../../../src/model/TaskFactory";
import {NodeColorMap} from "../../../src/model/NodeColorMap";

function fakeGatherNodeRaw(): string {
  return "{\n" +
    "            \"id\": \"063e4c0e-e878-462b-b89d-cca24c0918bd\",\n" +
    "            \"name\": \"aiMenu\",\n" +
    "            \"max_retries\": 2,\n" +
    "            \"fallback_node\": \"6f7c7264-45fd-456b-81e2-424b512dce3b\",\n" +
    "            \"timeout_node\": \"063e4c0e-e878-462b-b89d-cca24c0918bd\",\n" +
    "            \"max_retries_node\": \"60c9a2b8-0dda-4a80-9a90-a04c5e57f550\",\n" +
    "            \"node_type\": \"GATHER\",\n" +
    "            \"task\": {\n" +
    "                \"input_params\": {\n" +
    "                    \"messages\": [\n" +
    "                        {\n" +
    "                            \"msg_key\": \"callbot_actionable_insight_nl-NL\",\n" +
    "                            \"language\": \"nl-NL\",\n" +
    "                            \"msg_text\": \"Druk 1 om dit bericht nogmaals te horen. Hang op of druk op 2 om het gesprek te beëindigen. Druk 3 om met een medewerker doorgeschakeld te worden.\",\n" +
    "                            \"expression\": \"(language == 'nl-NL') && (audioKey.indexOf('fraud') == -1)\"\n" +
    "                        },\n" +
    "                        {\n" +
    "                            \"msg_key\": \"callbot_actionable_insight_fr-FR\",\n" +
    "                            \"language\": \"fr-FR\",\n" +
    "                            \"msg_text\": \"Appuyez sur 1 pour réécouter ce message. Raccrochez ou appuyez sur 2 pour mettre fin à l'appel. Appuyez sur le 3 pour être redirigé vers un collaborateur.\",\n" +
    "                            \"expression\": \"(language == 'fr-FR') && (audioKey.indexOf('fraud') == -1)\"\n" +
    "                        },\n" +
    "                        {\n" +
    "                            \"msg_key\": \"callbot_actionable_insight_fraud_nl-NL\",\n" +
    "                            \"language\": \"nl-NL\",\n" +
    "                            \"msg_text\": \"Druk 1 om dit bericht nogmaals te horen. Heb je toch op de link geklikt of gegevens ingevuld? Of heb je nog een andere vraag? Druk dan op 2 om met een medewerker te spreken. Hang op of druk op 3 om het gesprek te beëindigen.\",\n" +
    "                            \"expression\": \"(language == 'nl-NL') && (audioKey.indexOf('fraud') > -1)\"\n" +
    "                        },\n" +
    "                        {\n" +
    "                            \"msg_key\": \"callbot_actionable_insight_fraud_fr-FR\",\n" +
    "                            \"language\": \"fr-FR\",\n" +
    "                            \"msg_text\": \"Appuyez sur 1 pour réécouter ce message. Si vous avez cliqué sur le lien et fourni des données personnelles, ou si vous avez d'autres questions, appuyez sur le 2 pour être transféré avec un collaborateur. Raccrochez ou appuyez sur 3 pour mettre fin à l'appel.\",\n" +
    "                            \"expression\": \"(language == 'fr-FR') && (audioKey.indexOf('fraud') > -1)\"\n" +
    "                        }\n" +
    "                    ],\n" +
    "                    \"num_digits\": 1,\n" +
    "                    \"timeout\": 5\n" +
    "                },\n" +
    "                \"result\": {\n" +
    "                    \"actionableMenuKey\": [\n" +
    "                        \"${Digits}\"\n" +
    "                    ]\n" +
    "                },\n" +
    "                \"pre_actions\": [],\n" +
    "                \"post_actions\": []\n" +
    "            },\n" +
    "            \"flows\": [\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionableMenuKey == 1\",\n" +
    "                    \"to\": \"09aa921a-9d2f-4c9b-bd86-c2c0b13b5f30\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionableMenuKey == 3 && (audioKey.indexOf('fraud') > -1)\",\n" +
    "                    \"to\": \"246ce423-d91c-4e6f-b001-7fc63d24c88d\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionableMenuKey == 2 && (audioKey.indexOf('fraud') == -1)\",\n" +
    "                    \"to\": \"246ce423-d91c-4e6f-b001-7fc63d24c88d\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionableMenuKey == 2 && (audioKey.indexOf('fraud') > -1)\",\n" +
    "                    \"to\": \"60c9a2b8-0dda-4a80-9a90-a04c5e57f550\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionableMenuKey == 3 && (audioKey.indexOf('fraud') == -1)\",\n" +
    "                    \"to\": \"60c9a2b8-0dda-4a80-9a90-a04c5e57f550\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }"
}

function fakeDataNodeRaw() {
  return "{\n" +
    "            \"id\": \"8734c0e8-f4b9-4973-952a-6ed9a512dd37\",\n" +
    "            \"name\": \"robotlerApiSomethingWentWrong\",\n" +
    "            \"node_type\": \"DATA\",\n" +
    "            \"task\": {\n" +
    "                \"input_params\": {},\n" +
    "                \"result\": {\n" +
    "                    \"closingAnnouncement\": [\n" +
    "                        \"DBP_General_Closed\"\n" +
    "                    ],\n" +
    "                    \"ohTable\": [\n" +
    "                        \"DBP_General_C\"\n" +
    "                    ],\n" +
    "                    \"inputSpeech\": [\n" +
    "                        \"${queryType == 'event' ? SpeechResult : inputSpeech != null ? inputSpeech : null}\"\n" +
    "                    ],\n" +
    "                    \"actionName\": [\n" +
    "                        \"switch_ivr\"\n" +
    "                    ],\n" +
    "                    \"displayText\": [\n" +
    "                        \"human handover\"\n" +
    "                    ],\n" +
    "                    \"queryType\": [\n" +
    "                        \"${queryType == 'event' ? 'text' : queryType != null ? queryType : null}\"\n" +
    "                    ],\n" +
    "                    \"audioKey\": [\n" +
    "                        \"${!(inputSpeech == null || inputSpeech.length < 1) ? 'Callbot_Default' : audioKey != null ? audioKey : null}\"\n" +
    "                    ]\n" +
    "                },\n" +
    "                \"pre_actions\": [],\n" +
    "                \"post_actions\": []\n" +
    "            },\n" +
    "            \"flows\": [\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"true\",\n" +
    "                    \"to\": \"09aa921a-9d2f-4c9b-bd86-c2c0b13b5f30\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName != null && actionName == 'switch_ivr' && menuId != null && menuId == 'mainMenu'\",\n" +
    "                    \"to\": \"f5aa70f7-9698-499a-8897-011a31c7d73e\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName != null && actionName == 'switch_ivr' && menuId != null && menuId == 'menu2'\",\n" +
    "                    \"to\": \"956ad4b7-fc28-49ce-bcfe-66c367944c0d\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName != null && actionName == 'switch_ivr' && menuId != null && menuId == 'menu1'\",\n" +
    "                    \"to\": \"59609e17-747e-43d2-a1fa-62bd43a8a9dc\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName != null && actionName == 'switch_ivr' && menuId != null && menuId == 'menu1111'\",\n" +
    "                    \"to\": \"6746d493-34c7-4742-be70-4860dd84238d\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName != null && actionName == 'switch_ivr' && menuId != null && menuId == 'menu11'\",\n" +
    "                    \"to\": \"7b8bcd45-8305-4aae-87f0-4e2644af8e54\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName != null && actionName == 'switch_ivr' && menuId != null && menuId == 'menu111'\",\n" +
    "                    \"to\": \"cc828027-b69b-46eb-87e0-1c07bde8b668\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName != null && actionName == 'switch_ivr' && callFlowName in {'LEN_ICC','Invest_ICC','DBBusinessGeneralLines','DBP_Insurance'}\",\n" +
    "                    \"to\": \"578dc5c5-84e9-4a92-873a-8f2bbadac034\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"actionName in {'handover','audio_selfservice','audio_actions'} && StringUtils.isNotBlank(skillMapping)\",\n" +
    "                    \"to\": \"7ecce708-0812-4993-b225-27ba3a00a500\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"true\",\n" +
    "                    \"to\": \"59609e17-747e-43d2-a1fa-62bd43a8a9dc\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }"
}

function fakeMessageNodeRaw() {
  return "{\n" +
    "            \"id\": \"d0c3cf4e-8f77-4d1e-afa8-ab95322b444f\",\n" +
    "            \"name\": \"onIngIdMenuFailure\",\n" +
    "            \"node_type\": \"MESSAGE\",\n" +
    "            \"task\": {\n" +
    "                \"input_params\": {\n" +
    "                    \"messages\": [\n" +
    "                        {\n" +
    "                            \"msg_key\": \"Identification_Incorrect_nl-NL\",\n" +
    "                            \"language\": \"nl-NL\",\n" +
    "                            \"msg_text\": \"\\r\\n      Dit nummer is niet correct.\\r\\n    \",\n" +
    "                            \"expression\": \"(language == 'nl-NL')\"\n" +
    "                        },\n" +
    "                        {\n" +
    "                            \"msg_key\": \"Identification_Incorrect_fr-FR\",\n" +
    "                            \"language\": \"fr-FR\",\n" +
    "                            \"msg_text\": \"\\r\\n      Ce numero n'est pas correct.\\r\\n    \",\n" +
    "                            \"expression\": \"(language == 'fr-FR')\"\n" +
    "                        },\n" +
    "                        {\n" +
    "                            \"msg_key\": \"Identification_Incorrect_en-GB\",\n" +
    "                            \"language\": \"en-GB\",\n" +
    "                            \"msg_text\": \"\\r\\n      This number is not correct.\\r\\n    \",\n" +
    "                            \"expression\": \"(language == 'en-GB')\"\n" +
    "                        },\n" +
    "                        {\n" +
    "                            \"msg_key\": \"Identification_Incorrect_de-DE\",\n" +
    "                            \"language\": \"de-DE\",\n" +
    "                            \"msg_text\": \"\\r\\n      Diese Nummer ist nicht korrekt.\\r\\n    \",\n" +
    "                            \"expression\": \"(language == 'de-DE')\"\n" +
    "                        }\n" +
    "                    ]\n" +
    "                },\n" +
    "                \"result\": {},\n" +
    "                \"pre_actions\": [],\n" +
    "                \"post_actions\": []\n" +
    "            },\n" +
    "            \"flows\": [\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"true\",\n" +
    "                    \"to\": \"90c9c267-eab4-4fe0-beab-3985de7975da\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }"
}

function fakeTaskAttrStoreNodeRaw() {
  return "{\n" +
    "            \"id\": \"93f589c9-ed21-4736-8f26-2604d430e04d\",\n" +
    "            \"name\": \"storeIPATaskAttrs\",\n" +
    "            \"node_type\": \"TASK_ATTRS_STORE\",\n" +
    "            \"task\": {\n" +
    "                \"input_params\": {\n" +
    "                    \"task_attrs\": {\n" +
    "                        \"branch\": \"${(managingEntities$ != null ? managingEntities$.type : null)}\",\n" +
    "                        \"segment\": \"${segment}\",\n" +
    "                        \"status\": \"${lookUpStatus}\",\n" +
    "                        \"full name\": \"${lookUpIndividuals.individualNames[0].lastName}\",\n" +
    "                        \"lang\": \"${lookUpPreferredLanguage}\",\n" +
    "                        \"zip code\": \"${lookUpIndividuals.postalAddresses[0].postalCode}\",\n" +
    "                        \"bcsi\": \"${lookUpBCSI}\",\n" +
    "                        \"gender\": \"${lookUpGender}\"\n" +
    "                    }\n" +
    "                },\n" +
    "                \"result\": {},\n" +
    "                \"pre_actions\": [],\n" +
    "                \"post_actions\": []\n" +
    "            },\n" +
    "            \"flows\": [\n" +
    "                {\n" +
    "                    \"label\": \"label\",\n" +
    "                    \"value\": \"true\",\n" +
    "                    \"to\": \"92295e0c-f794-4bc1-b199-289183955f42\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }"
}

export function fakeTaskAttrStoreNode(): NodeHolder {
  const pepe = JSON.parse(fakeTaskAttrStoreNodeRaw());
  return {
    position: 0,
    index: 0,
    color: NodeColorMap.getColor(pepe.node_type),
    name: pepe.name,
    nodeType: pepe.node_type,
    id: pepe.id,
    maxRetries: +pepe.max_retries,
    fallbackNodeId: pepe.fallback_node,
    timeoutNodeId: pepe.timeout_node,
    flows: [],
    flowsList: [],
    node: {},
    edges: [],
    task: TaskFactory.getTask(pepe.node_type).build(pepe.task)
  }
}

export function fakeDataNode(): NodeHolder {
  const pepe = JSON.parse(fakeDataNodeRaw());
  return {
    position: 0,
    index: 0,
    color: NodeColorMap.getColor(pepe.node_type),
    name: pepe.name,
    nodeType: pepe.node_type,
    id: pepe.id,
    maxRetries: +pepe.max_retries,
    fallbackNodeId: pepe.fallback_node,
    timeoutNodeId: pepe.timeout_node,
    flows: [],
    flowsList: [],
    node: {},
    edges: [],
    task: TaskFactory.getTask(pepe.node_type).build(pepe.task)
  }
}

export function fakeMessageNode(): NodeHolder {
  const pepe = JSON.parse(fakeMessageNodeRaw());
  return {
    position: 0,
    index: 0,
    color: NodeColorMap.getColor(pepe.node_type),
    name: pepe.name,
    nodeType: pepe.node_type,
    id: pepe.id,
    maxRetries: +pepe.max_retries,
    fallbackNodeId: pepe.fallback_node,
    timeoutNodeId: pepe.timeout_node,
    flows: [],
    flowsList: [],
    node: {},
    edges: [],
    task: TaskFactory.getTask(pepe.node_type).build(pepe.task)
  }
}

export function fakeGatherNode(): NodeHolder {
  const pepe = JSON.parse(fakeGatherNodeRaw());
  return {
    position: 0,
    index: 0,
    color: '#a033ff',
    name: pepe.name,
    nodeType: pepe.node_type,
    id: pepe.id,
    maxRetries: +pepe.max_retries,
    fallbackNodeId: pepe.fallback_node,
    timeoutNodeId: pepe.timeout_node,
    flows: [],
    flowsList: [],
    node: {},
    edges: [],
    task: TaskFactory.getTask(pepe.node_type).build(pepe.task)
  }
}
