# This is only for test purposes, for example if the image builds at all.

# ../../ sets the context for the copy commands etc. to the parent folder relative from this file here.
# docker image build ../../ -f ./Dockerfile

# Show everything on console
docker image build ../../ -f ./Dockerfile --progress=plain
