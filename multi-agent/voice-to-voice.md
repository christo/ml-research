# Voice to Voice Interactions

Voice to voice interaction over the phone with an LLM needs to accomodates:

* session establishment and context reloading based on receiving or making a call
* static reference material
* basic situational and data state
  * what kind of phone
  * relevant reference information
  * home, family, administrative facts, computer state
  * metadata of the person/organisation being spoken to
  * being guided in step-by-step instructions
  * answering machines and IVR menu state
* Input audio processing
  * separating background speech from foreground speech
  * identifying ambient noises
  * voice drop outs
  * hold music
* Speech To Text (STT) to understand what is being said to it.
  * sentiment detection
  * shouting
  * speaking in other languages
  * detection of environment noise
  * detection of IVR systems and keypad instructions
* Foley
  * synthesised sounds and audio effects for:
    * typing on a keybord
    * sipping tea
    * moving away from the phone
    * switching to speaker
* Text to Speech (TTS) to speak responses
  * parametising emotion derived from LLM, either by sentiment analysis or interacting with LLM initated function calls
  * must have enough example speech to synthesise emotions received as parameters
  * predefined and dynamic pronunciation tuning
    * phone numbers and other codes
    * domain names (don't typically have capitalisation to help disambiguate acronym parts e.g. vmware.com)
    * parametised speaking rate
  * paraverbal augmentation:
    * sighs, laughing, singing
* Core LLM chat fine-tuning. This may be canonical instructions like what Llama open source models are fine tuned with. Alternatives may include:
  * Character embodiment in a defined 1 on 1 conversation
  * Functions defined below
  * Asides with returns, e.g. "oh that reminds me of a story ... well anyway" (return)
* Functions (potentially implemented with other LLM) for:
  * triggering and tracing emotional state
    * anger, frustration, shock, fear, empathy, etc.
  * elapsed time (see also wait states)
  * understanding typical literal dictation
    * "y as in yellow"
    * numbers
    * clarifying "James with a J"
  * pronunciation direction
    * if the other speaker defines pronunciation to be adopted, it should be stored and consistently applied
  * summarising local conversation memory or compression of context tokens
  * "writing things down" - special purpose, literal note taking that can be referred back to. The LLM can direct text to a "notebook" and refine its contents in n-shot interactions with the primary interlocutor.
  * long term memory of ongoing interaction state with specific interlocutor
  * recalling things that were written down
  * recalling things from past interactions based on how noteworthy they are
  * using a computer - this is a whole category
  * causing noises
  * dynamic policy formation
    * being asked not to do something
    * being consciously non-compliant to specific policies (metapolicy)
  * stateful transitions for physical event modelling:
    * driving a car
    * speakerphone
    * being outside
    * being in a shop
    * interacting with pets or other people on this end (need additional agent)
  * hanging up a call with concluding remarks
    * by instruction from the other party
    * by detection of the other's implied intent
    * by own volition, communicated appropriately (or not)
  * entering a wait state for
    * a return call
    * being on hold
    * being transferred
    * the other party doing something or waiting
      * especially "give me a moment", "one moment please"
    * the other party having an audible conversation with someone else at the other end of the phone
    * overhearing ambient noise or unexpected interruption from either end
    * overhearing the other speaker talking to themselves
  * switching to a new call