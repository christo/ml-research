# Muzaklassifier

Idea: Machine learning project for classifying musical genres and other features
in recorded sound.

Each tag (e.g. techno, reggae) applies either implicitly to the whole tune or is
parametised to apply to a segment of audio (such as for a tag "contains
timpani"). Additionally, tags should be able to be arranged in a hierarchy. This
means that a tag which means "contains tambourine" implies "contains percussion
instrument".

It would be useful to be able to query music using the classes such that you
could select music that contains human voice and using the hierarchical
relationship between that tag and those that indicate that a segment contains
"singing" or "spoken word" result in an aggregate selection. This logic could
live outside the model.

By far the most challenging apparent problem with training machine learning
models on music appears, whether that be for generating, recognising or
analysing music is collecting, organising and curating classifier tags.

There is wide variance in human judgement about genres and online music
libraries are notoriously wrong when it comes to the application of popular
genre names. A related problem is that genre names are not all equally widely
recognised across listener populations or across time.

As a result, it would be ideal to store each application of a tag as a dated
claim that includes tracing information that includes:

* parametised tag e.g.
  * genre(techno)
  * contains(drums)
* date time stamp
* state (active, retracted, approximate, "low confidence")
* target (a tag for a music segment or another claim)
* inverted (claim of no application of class or disagreement of other claim)
  * alternately this could be a bipolar normalised confidence coefficient from
    -1 to 1 where -1 indicates maximum confidence in the opposite of the claim
  and zero indicates a claim of no confidence in application of the tag.

The state could be managed as part of a workflow where tags go through some kind
of vetting or confirmation by others. Thus the claim metadata above indicates
whether another claimant confirms or denies a claim (inverted field) and
likewise if a claim for a tagged class is asserting that the class does not
apply (i.e. this is not techno). Claims that invert other claims can be reduced
to an inverted claim about the underlying class application.

## Bootstrapping

Starting a project to train a model with such broad application may be
infeasible, in which case an ideal starting point could be to focus exclusively
on a narrow set of musical genres such as electronic dance music. Growing out
from such a focus to a wider range of electronic music and/or dance music could
work well.

## Gamification

Because there's so much human work to do to classify audio, perhaps a way of
harnessing human judgement is to make a competitive game. It's important to
remember that there is no absolute canonical truth, only a cultural and
subcultural clustering of patterns of judgement.

Thus the game would be to guess the genre of a segment of music (possibly
AI-generated) that the other participants would choose. The most popular answer
within a playing population is the target.

At odds with this is the subcultural clustering of taste and opinion confidence.
Some people may be uninterested in certain genres and/or have low confidence in
their answers. Somehow such players should be segmented, presumably based on
their own preferences but it may also help to conduct such quizzes in
automatically allocated smaller groups such that this divergence of playing
performance and therefore the value of their tagging contributions can be
optimally identified. It is a bit of a chicken-or-egg problem but some human
meta-judgement may help bootstrap the process.

Just as Reddit famously created many sock puppets to portray a busier and more
vibrant site when it was just starting out, this strategy may help provide some
groundswell.

### Tag Proposals

We don't want the messy proliferation of spelling variations or duplication of
genre names. So the proposal for a new tag needs to be easy and incentivised and
yet there must be thresholds for its adoption. There may also be tags which are
different in different regions. Also, i18n and l10n translations must be
considered in the beginning. Not only will tags vary by language but different
locales may divide music differently. It's possible that initial model training
is best done monolingual.

### Points

Players must be incentivised to opt out of making a judgement (or recording
a judgement with coefficient 0), so the following points might make sense:

* 10 identified most popular tag application
* 1 opt out of making a judgement
* -10 misidentified most popular tag application
* 20 tag proposal widely adopted
* -20 tag proposal widely rejected

## Integrations

This domain model should accommodate, for example:

* algorithms that detect tempo, silence, or even identify instruments and genres
* available databases
* other miscellaneous sources of claims about music
* dedicated human curators

The question of applying a potentially vast set of classes does pose some
questions:

* How does the number of classes affect the architecture of the model?
* Can classes be dynamically applied to an already-trained model?
* How many class applications are required useful inference accuracy? (what is
the canonical term for this?)

## Claim Types

* Human tag application
* Algorithmic tag application
* External tag dataset
* Music identity dataset (this could be modelled with tags)

## Tags

The tag should apply specifically to the musical segment and carry no
assertions about audio outside this context.

This might become tricky because a whole track could be classified by a genre
which indicates that the whole track can be categorised thus, but a breakdown in
the middle could betray no hint of this genre. Isolated, this segment might
carry another classification which could naively be considered to be mutually
exclusive. However, the fact that the inner segment is focused on a narrower
extent means that no such contradiction can be valid. Likewise, a tune could be
tagged as a medley but individual song segments would not be a medley.

## Generality

The system for RLHF (Reinforcement Learning with Human Feedback) here is
isomorphic to synthetic data integration. Additionally, while the trained models
are expected to be highly specific to the tag space and training sounds, the
coordination application would be just as applicable to any temporal media
classification including instrument sounds, sound effects, spoken word (such as
for transcription) or video (though this would require a different media
front-end).
